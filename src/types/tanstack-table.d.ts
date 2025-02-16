declare module '@tanstack/table-core' {
  interface ColumnMeta<TData, TValue> {
    mobileHidden?: boolean;
    filterVariant?: "range" | "select";
    data?: TData;
    value?: TValue;
  }
}
import '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
		mobileHidden?: boolean;
		filterVariant?: "range" | "select";
		data?: TData;
		value?: TValue;
	}
}