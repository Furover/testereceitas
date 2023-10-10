import{ View, StyleSheet, Text} from 'react-native'

export default function App(){
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Gaminggg</Text>
      <Nome nome="gamer"/>
      <Nome nome="gamer2"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "red",
    height: 400
  },
  title:{
    fontSize: 24,
    marginTop: 100
    
  }


})

function Nome({nome}){
  return(
    <Text>Olá {nome}</Text>
  )
}