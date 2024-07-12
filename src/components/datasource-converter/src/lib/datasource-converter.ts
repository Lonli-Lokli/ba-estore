import { RetailerDm } from '@ba-estore/shapes';
import { z } from 'zod';

export function datasourceConverter(data: unknown): RetailerDm[] {
  return schema.parse(data).map(retailerConverter);
}

function retailerConverter(item: z.infer<typeof schema>[number]): RetailerDm {
  return {
    bonuses: item.avios,
    description: item.description,
    destinationUrl: `https://shopping.ba.com/retailers${item.destinationUrl}`,
    isSpeedyAwarding: item.isSpeedyAwarding,
    logo: item.logoSrc.split('/').pop() ?? '',
    maxAviosPerPound: calculateMaxAvios(item.slug, item.rate, item.avios),
    name: item.name,
    rate: item.rate,
  };
}
const schema = z.array(
  z.object({
    rate: z.string(),
    wasRate: z.union([z.null(), z.string()]),
    logoSrc: z.string(),
    name: z.string(),
    slug: z.string(),
    destinationUrl: z.string(),
    isSpeedyAwarding: z.boolean(),
    description: z.string(),
    avios: z.array(
      z.object({
        condition: z.string(),
        value: z.string(),
      })
    ),
  })
);

const perAviosRegex = /^((\d+,)?\d+) Avios (\/|per) £1( spent)?$/g;
const perAviosV2Regex = /^((\d+,)?\d+) Avios \/ 1 Point?$/g;
const pureAviosRegex = /^((\d+,)?\d+) Avios$/g; // '800 Avios'
const unstrict_upToPureAviosRegex = /\D+((\d+,)?\d+) Avios\D?/g;
const unstrict_perRateRegex = /((\d+,)?\d+) Avios (\/|per) £1( spent)?$/g;

const customMapping: Record<string, number> = {
  '2000 Radisson Rewards points / 200 Avios': 10,
};
export function calculateMaxAvios(
  id: string,
  rate: string,
  avios: z.infer<typeof schema>[number]['avios']
) {
  if (avios.length === 0) {
    // we should strictly parse only rate
    const perAvios = checkAllOptions(rate, true);
    if (isDefined(perAvios)) return perAvios;

    throw new Error(`Could not exact parse '${rate}' for '${id}'`);
  }

  return Math.max(
    ...[rate, ...avios.map((a) => a.value)].map(
      (v) => checkAllOptions(v, false) ?? 0
    )
  );
}

function checkAllOptions(
  value: string,
  addNonStrictCheck: boolean
): number | undefined {
  return (
    byRegex(value, perAviosRegex) ??
    byRegex(value, perAviosV2Regex) ??
    byRegex(value, pureAviosRegex) ??
    customMapping[value] ??
    (addNonStrictCheck
      ? byRegex(value, unstrict_upToPureAviosRegex) ??
        byRegex(value, unstrict_perRateRegex)
      : undefined)
  );
}

function byRegex(value: string, regex: RegExp): number | undefined {
  const match = [...value.matchAll(regex)][0]?.[1]?.replace(/,/g, '');
  if (!isDefined(match)) return undefined;

  const valueAsNumber = Number(match);
  if (valueAsNumber.toString() !== match)
    throw new Error(
      `Regex passed but value extracted from '${value.toString()}' is invalid: '${match}'`
    );
  return valueAsNumber;
}

function isDefined<T>(v: T | null | undefined): v is T {
  return v !== null && v !== undefined;
}
