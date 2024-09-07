//This will hold our helper functions or method.
let userData = {};
if(localStorage.getItem("UserData")) {
    userData = JSON.parse(localStorage.getItem("UserData"));
}

//helper function to check our token.
const checkToken = () => {
    let result= false;
    let lsData = localStorage.getItem("Token");
    if(lsData && lsData != null)
    {
        result = true;
    }
    return result;
}

//helper function or method to createAccount, async and await
//fetch() json(), stringify
async function createAccount(createduser) {
    const result = await fetch('http://localhost:5021/api/User/AddUsers', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(createduser)
    });
    if (!result.ok) {
        const message = `Yo yo you have an Error Check your code!${result.status}`;
        throw new Error(message);
    }
    let data = await result.json();
    console.log(data, "create account method");

}


const login = async (loginUser) => 
{
    const result = await fetch('http://localhost:5021/api/User/Login',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginUser)
    })
    if(!result.ok)
    {
        const message = `Yo yo you have an Error Check your code!${result.status}`
        throw new Error(message);
    }
        let data = await result.json();
        if(data.token != null)
        {
            localStorage.setItem("Token",data.token);
            // localStorage.setItem("UserData",JSON.stringify(data.user));// This was returning a token and was getting undefined
        }
        console.log(data,"login method");
        return data;
}

    const GetLoggedInUser = async (username) => 
    {
       let result = await fetch(`http://localhost:5021/api/User/GetUserByUsername/${username}`)
       
       userData = await result.json();
        console.log(userData,"getloggedinsuser method")
        localStorage.setItem("UserData",JSON.stringify(userData));
        userData = JSON.parse(localStorage.getItem("UserData"));
            

    }

    const LoggedInData = () => 
    {
        if(!userData && localStorage.getItem("UserData")) {
            userData = JSON.parse(localStorage.getItem("UserData"))
        }
        return userData;
    }

    //We need a function to help us add our expense items
    const AddExpenseItems = async (expenseItems) => 
    {
        const result = await fetch("http://localhost:5021/api/expense/AddExpenseItems",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expenseItems)
        })
        if(!result.ok)
        {
            const message = `Yo yo you have an Error Check your code!${result.status}`
            throw new Error(message);
        }
            let data = await result.json();
            console.log(data,"addexpenseItems method");
            return data;
    }

    //Can we make a generic function to handle
    const sendData = async (controller,endpoint,passedInData) => 
    {
        const result = await fetch(`http://localhost:5021/api/${controller}/${endpoint}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(passedInData)
        })
        if(!result.ok)
        {
            const message = `Yo yo you have an Error Check your code!${result.status}`
            throw new Error(message);
        }
            let data = await result.json();
            console.log(data,"sendData");
            return data;
    }
    ///function to help us get our expenseitems
    const getExpenseItems = async () =>
    {
        let result = await fetch("http://localhost:5021/api/expense/GetExpenseItems")
       
       let data = await result.json();
         console.log(data,"from our getExpenseitems method")
         return data;
    }

    //create a function to hit our GetItemsByUserId 
    const GetItemsByUserId = async (UserId) => 
    {
        let result = await fetch(`http://localhost:5021/api/expense/GetItemsByUserId/${UserId}`)
       
        let data = await result.json();
          console.log(data,"from our getitemsbyuserid method")
          return data;
    }
    //Function to help us update our expense items
    const updateExpenseItems = async (expenseItems) => 
    {
        const result = await fetch(`http://localhost:5021/api/expense/UpdateExpenseItems`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expenseItems)
        })
        if(!result.ok)
        {
            const message = `Yo yo you have an Error Check your code!${result.status}`
            throw new Error(message);
        }
            let data = await result.json();
            console.log(data,"from our UpdateExpenseItems")
            return data;

    }
//function to get our published expense itmes to display
    const getPublishedExpenseItems = async () =>
    {
        let result = await fetch("http://localhost:5021/api/expense/GetPublishedItems")
        let data = await result.json();
        return data;

    }


export {checkToken, createAccount, userData, login, GetLoggedInUser, LoggedInData, sendData, AddExpenseItems, getExpenseItems, GetItemsByUserId, updateExpenseItems, getPublishedExpenseItems}