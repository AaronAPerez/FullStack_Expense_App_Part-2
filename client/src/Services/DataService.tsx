import axios from 'axios';
import { BASE_URL } from '../constant';

interface UserData {
    id: number;
    username: string;
}
interface ExpenseItem {
    id: number;
    description: string;
    amount: number;
    category: string;
    isPublished: boolean;
    isDeleted: boolean;
}

const instance = axios.create({
    baseURL: BASE_URL,
});


const checkToken = (): boolean => {
    return !!localStorage.getItem('Token');
};

const createAccount = async (createdUser: unknown): Promise<any> => {
    try {
        const response = await instance.post('/User/AddUsers', createdUser);
        return response.data;
    } catch (error) {
        throw new Error(`Error in createAccount: ${error.message}`);
    }
};

const login = async (loginUser: unknown): Promise<any> => {
    try {
        const response = await instance.post('/User/Login', loginUser);
        if (response.data.token) {
            localStorage.setItem('Token', response.data.token);
        }
        return response.data;
    } catch (error) {
        throw new Error(`Error in login: ${error.message}`);
    }
};

const getLoggedInUser = async (username: string): Promise<UserData | void> => {
    try {
        const response = await instance.get(`/User/GetUserByUsername/${username}`);
        localStorage.setItem('UserData', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        throw new Error(`Error in getLoggedInUser: ${error.message}`);
    }
};

const getLoggedInUserData = (): UserData | {} => {
    const storedData = localStorage.getItem('UserData');
    return storedData ? JSON.parse(storedData) : {};
};

const addExpenseItems = async (expenseItems: ExpenseItem[]): Promise<any> => {
    try {
        const response = await instance.post('/Expense/AddExpenseItems', expenseItems);
        return response.data;
    } catch (error) {
        throw new Error(`Error in addExpenseItems: ${error.message}`);
    }
};

const sendData = async (controller: string, endpoint: string, passedInData: unknown): Promise<any> => {
    try {
        const response = await instance.post(`/${controller}/${endpoint}`, passedInData);
        return response.data;
    } catch (error) {
        throw new Error(`Error in sendData: ${error.message}`);
    }
};

const getExpenseItems = async (): Promise<any> => {
    try {
        const response = await instance.get('/Expense/GetExpenseItems');
        return response.data;
    } catch (error) {
        throw new Error(`Error in getExpenseItems: ${error.message}`);
    }
};

const getItemsByUserId = async (userId: string): Promise<any> => {
    try {
        const response = await instance.get(`/Expense/GetItemsByUserId/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error in getItemsByUserId: ${error.message}`);
    }
};

const updateExpenseItems = async (expenseItems: ExpenseItem[]): Promise<any> => {
    try {
        const response = await instance.post('/Expense/UpdateExpenseItems', expenseItems);
        return response.data;
    } catch (error) {
        throw new Error(`Error in updateExpenseItems: ${error.message}`);
    }
};

const getPublishedExpenseItems = async (): Promise<any> => {
    try {
        const response = await instance.get('/Expense/GetPublishedItems');
        return response.data;
    } catch (error) {
        throw new Error(`Error in getPublishedExpenseItems: ${error.message}`);
    }
};

export {
    checkToken,
    createAccount,
    login,
    getLoggedInUser,
    getLoggedInUserData,
    addExpenseItems,
    sendData,
    getExpenseItems,
    getItemsByUserId,
    updateExpenseItems,
    getPublishedExpenseItems,
};