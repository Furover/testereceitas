import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

import { Feather } from '@expo/vector-icons'
import { WebView } from 'react-native-webview'

export function VideoView({ handleClose, videoUrl }){
    return(
        <SafeAreaView style={styles.container} >
            <TouchableOpacity style={styles.backButton} onPress={handleClose} >
                <Feather name="arrow-left" size={24} color="#FFF" />
                <Text style={styles.backText} >Voltar</Text>
            </TouchableOpacity>
            <WebView
                style={styles.container}
                source={{ uri: videoUrl }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        backgroundColor: '#4BCE6C',
        height: 'auto',
    },
    backButton:{
        width: '30%',
        backgroundColor: '#4BCE6C',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 14
    },
    backText:{
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 14
    }
})