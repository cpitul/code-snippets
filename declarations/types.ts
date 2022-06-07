type RecordKey = string | number | symbol;
type BaseElementType = Window | Document | HTMLElement | MediaQueryList;
type Translations = Record<RecordKey, Record<RecordKey, string | Record<RecordKey, string>>>;
type MatchObjKeysReturnType = { isValid: boolean; errorFields: string[] };
type Delimiter = ';';
type ParseCSVData = string | ArrayBuffer;

export type { BaseElementType, RecordKey, Translations, MatchObjKeysReturnType, Delimiter, ParseCSVData };
