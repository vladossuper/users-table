import { createContext } from 'react';
import { makeObservable, observable, computed, action } from 'mobx';
import { UserModel } from '../models';

interface IUser {
    id: string,
    time: string,
    name: string,
    status: boolean
}

export class Users {
    users: UserModel[] | null = null

    constructor() {
        makeObservable(this, {
            users: observable,
            usersList: computed,
            fetchUsers: action.bound,
            setUser: action.bound,
            changeStatus: action.bound
        })
    }

    get usersList() {
        return this.users;
    }

    fetchUsers() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        this.users = users;
    }

    setUser(user: IUser) {
        this.users?.push(user);

        localStorage.setItem('users', JSON.stringify(this.users));
    }

    changeStatus(users: IUser[], id: string) {
        const newUsersArray = users?.map(user => user.id === id ? { ...user, status: !user.status } : { ...user });

        this.users = newUsersArray;
        
        localStorage.setItem('users', JSON.stringify(this.users))
    }
}

export const UsersStore = createContext(new Users())
