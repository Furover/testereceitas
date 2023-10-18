import AsyncStorage from '@react-native-async-storage/async-storage'

//Buscar os favoritos
//Salvar um novo favorito
//Remover um favorito

export async function getFavorite(key){
    const favorites = await AsyncStorage.getItem(key)
    return JSON.parse(favorites) || [];
}

export async function makeFavorite(key, newItem){
    let myFavorite = await getFavorite(key);

    let alrdyFavorite = myFavorite.some( item => item.id === newItem.id )

    if(alrdyFavorite){
        console.log("nope")
        return;
    }
    
    myFavorite.push(newItem)

    await AsyncStorage.setItem(key, JSON.stringify(myFavorite))
    console.log("Saved")
}

export async function removeFavorite(id){
    let recipe = await getFavorite("@appreceitas");

    let myFavorite = recipe.filter( item => {
        return (item.id !== id )
    } )

    await AsyncStorage.setItem("@appreceitas", JSON.stringify(myFavorite))
    console.log("Deleted")
    return myFavorite;
}   

export async function isFavorite(recipe){

    let myRecipe = await getFavorite("@appreceitas")

    const favorite = myRecipe.find(item => item.id === recipe.id)

    if(favorite){
        return true;
    }
        return false;
    

}