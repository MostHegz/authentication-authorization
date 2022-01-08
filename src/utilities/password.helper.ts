import * as bcrypt from 'bcrypt';

export class PasswordHelper {

    public static hashPassword(password: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
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
            bcrypt.compare(password, hash, (err, res) => {
                if (err) {
                    reject(err);
                } else if (res) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }
}
