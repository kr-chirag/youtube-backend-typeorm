import { User } from "../models";
import { dataSource } from "../utils/dataSource";

const UserRepository = dataSource.getRepository(User);

const selectOptions = {
    id: true,
    name: true,
    email: true,
};

export async function createUser(name: string, email: string, pass: string) {
    const user = new User(name, email, pass);
    await UserRepository.save(user);
    const { password, ...userWithouPassword } = user;
    return userWithouPassword;
}

export async function getUserByEmail(email: string) {
    const user = await UserRepository.findOneBy({ email });
    return user;
}

export async function getUserByID(id: number) {
    const user = await UserRepository.findOne({
        where: { id },
        relations: { videos: true },
        select: selectOptions,
    });
    return user;
}

export async function getAllUsers() {
    const allUser = await UserRepository.find({
        select: selectOptions,
    });
    return allUser;
}
