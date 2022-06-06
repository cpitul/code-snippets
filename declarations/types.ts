export type { BaseElementType, UseEffectCb, RecordKey, Translations };

type RecordKey = string | number | symbol;
type BaseElementType = Window | Document | HTMLElement | MediaQueryList;
type UseEffectCb = (() => void) | (() => () => void);
type Translations = Record<RecordKey, Record<RecordKey, string | Record<RecordKey, string>>>;
