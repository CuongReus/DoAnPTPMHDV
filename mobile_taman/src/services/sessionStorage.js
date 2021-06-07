import {AsyncStorage} from 'react-native';
// hàm ghi 1 giá trị vào trong sessionStorage
async function setItem(itemName, value) {
    try{
        await AsyncStorage.setItem(itemName, value);
    }
    catch(error){
    }
}
// hàm đọc 1 giá trị từ sessionStorage
async function getItem(itemName){
    try{
        const value = await AsyncStorage.getItem(itemName);
        return value;
    }
   catch(error){
    return null
   }
}

async function multiGetItems(keys){
    try{
        const values = await AsyncStorage.multiGet(keys);
        return values;
    }
   catch(error){
    return null
   }
}

async function removeItem(itemName){
    try{
        const value = await AsyncStorage.removeItem(itemName);
        return value;
    }
   catch(error){
    return null
   }
}


export default{
    setItem,
    getItem,
    removeItem,
    multiGetItems
}