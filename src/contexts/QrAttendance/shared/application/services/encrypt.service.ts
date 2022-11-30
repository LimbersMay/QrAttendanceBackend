
export interface EncryptService {
    hash(text: string): Promise<string>;
    compare(text: string, verify: string): Promise<boolean>;
}
