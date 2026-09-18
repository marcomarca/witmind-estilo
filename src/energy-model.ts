export type EnergyCircuit = {
  entity: string;
  name: string;
  zone: string;
  zoneLabel: string;
  watts: number | null;
};

export type HistoryPoint = { state: string; timestamp: number };

export type EnergyBucket = {
  start: number;
  end: number;
  totalKwh: number;
  zones: Record<string, number>;
};

export type CircuitUsage = {
  entity: string;
  name: string;
  zone: string;
  zoneLabel: string;
  watts: number | null;
  hours: number;
  kwh: number | null;
  bucketHours: number[];
};

export type EnergyReport = {
  buckets: EnergyBucket[];
  circuits: CircuitUsage[];
  totalKwh: number;
  zoneTotals: Record<string, number>;
  peakKwh: number;
  peakIndex: number;
  knownCircuits: number;
  totalCircuits: number;
};

const pointTimestamp = (value: Record<string, unknown>) => {
  const text = value.last_changed ?? value.last_updated;
  if (typeof text === "string") {
    const parsed = Date.parse(text);
    if (Number.isFinite(parsed)) return parsed;
  }
  const compact = Number(value.lu ?? value.lc ?? value.timestamp);
  if (!Number.isFinite(compact)) return Number.NaN;
  return compact < 10_000_000_000 ? compact * 1000 : compact;
};

const pointState = (value: Record<string, unknown>) => String(value.state ?? value.s ?? "unknown");

export function normalizeHistoryResponse(raw: unknown): Record<string, HistoryPoint[]> {
  const result: Record<string, HistoryPoint[]> = {};
  const append = (entity: string, rows: unknown[]) => {
    if (!entity) return;
    const points = rows
      .filter((row): row is Record<string, unknown> => Boolean(row && typeof row === "object"))
      .map((row) => ({ state: pointState(row), timestamp: pointTimestamp(row) }))
      .filter((point) => Number.isFinite(point.timestamp))
      .sort((a, b) => a.timestamp - b.timestamp);
    result[entity] = points;
  };

  if (Array.isArray(raw)) {
    raw.forEach((group) => {
      if (!Array.isArray(group) || !group.length) return;
      const first = group[0] as Record<string, unknown>;
      append(String(first.entity_id ?? first.entityId ?? ""), group);
    });
    return result;
  }

  if (raw && typeof raw === "object") {
    Object.entries(raw as Record<string, unknown>).forEach(([entity, rows]) => {
      if (Array.isArray(rows)) append(entity, rows);
    });
  }
  return result;
}

export function buildEnergyReport(
  circuits: EnergyCircuit[],
  history: Record<string, HistoryPoint[]>,
  start: number,
  end: number,
  bucketMs: number,
): EnergyReport {
  const safeBucket = Math.max(60_000, bucketMs);
  const bucketCount = Math.max(1, Math.ceil(Math.max(0, end - start) / safeBucket));
  const buckets: EnergyBucket[] = Array.from({ length: bucketCount }, (_, index) => ({
    start: start + index * safeBucket,
    end: Math.min(end, start + (index + 1) * safeBucket),
    totalKwh: 0,
    zones: {},
  }));
  const zoneTotals: Record<string, number> = {};

  const usages = circuits.map((circuit): CircuitUsage => {
    const bucketHours = Array.from({ length: bucketCount }, () => 0);
    const points = (history[circuit.entity] || []).filter((point) => point.timestamp <= end);
    let initialState = "off";
    for (const point of points) {
      if (point.timestamp > start) break;
      initialState = point.state;
    }
    const timeline = [
      { state: initialState, timestamp: start },
      ...points.filter((point) => point.timestamp > start && point.timestamp < end),
    ];

    timeline.forEach((point, index) => {
      if (point.state !== "on") return;
      let cursor = Math.max(start, point.timestamp);
      const segmentEnd = Math.min(end, timeline[index + 1]?.timestamp ?? end);
      while (cursor < segmentEnd) {
        const bucketIndex = Math.min(bucketCount - 1, Math.floor((cursor - start) / safeBucket));
        const sliceEnd = Math.min(segmentEnd, start + (bucketIndex + 1) * safeBucket);
        bucketHours[bucketIndex] += Math.max(0, sliceEnd - cursor) / 3_600_000;
        cursor = sliceEnd;
      }
    });

    const hours = bucketHours.reduce((sum, value) => sum + value, 0);
    const kwh = circuit.watts === null ? null : (hours * circuit.watts) / 1000;
    if (circuit.watts !== null) {
      bucketHours.forEach((hoursInBucket, index) => {
        const energy = (hoursInBucket * circuit.watts!) / 1000;
        buckets[index].totalKwh += energy;
        buckets[index].zones[circuit.zone] = (buckets[index].zones[circuit.zone] || 0) + energy;
      });
      zoneTotals[circuit.zone] = (zoneTotals[circuit.zone] || 0) + (kwh || 0);
    }
    return { ...circuit, hours, kwh, bucketHours };
  });

  const totalKwh = buckets.reduce((sum, bucket) => sum + bucket.totalKwh, 0);
  const peakKwh = Math.max(0, ...buckets.map((bucket) => bucket.totalKwh));
  const peakIndex = Math.max(0, buckets.findIndex((bucket) => bucket.totalKwh === peakKwh));
  return {
    buckets,
    circuits: usages,
    totalKwh,
    zoneTotals,
    peakKwh,
    peakIndex,
    knownCircuits: circuits.filter((circuit) => circuit.watts !== null).length,
    totalCircuits: circuits.length,
  };
}

export function buildDimmingCurve(baseKwh: number) {
  return Array.from({ length: 9 }, (_, index) => {
    const percent = (index + 1) * 10;
    const savedKwh = Math.max(0, baseKwh) * (percent / 100);
    return { percent, savedKwh, remainingKwh: Math.max(0, baseKwh - savedKwh) };
  });
}
