export interface respuestaHttpApi<T> {
    error: boolean,
    msg: string,
    data: T
};