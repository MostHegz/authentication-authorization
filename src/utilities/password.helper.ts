import * as bcrypt from 'bcrypt';

export class PasswordHelper {

    public static hashPassword(password: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            bcrypt.hash(password, 10, (err: Error, hash: string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
    }

    public static comparePassword(password: string, hash: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            bcrypt.compare(password, hash, (err: Error, res: boolean) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
}
