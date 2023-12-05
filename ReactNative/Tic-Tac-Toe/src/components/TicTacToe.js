import { View, Text, SafeAreaView, Pressable, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const TicTacToe = () => {

    const [active_player,setActive_player] = useState("X")
    const [markers, setMarkers] = useState([
        null, null, null,
        null, null, null,
        null, null, null
      ])
    
      const markPosition = (position) => {
        if(!markers[position]){
          let temp = [...markers]
          temp[position] = active_player
          setMarkers(temp)
          if(active_player === 'X'){ 
            setActive_player('O')
          }else{
            setActive_player('X')
          }
        }
      }
    
      const resetMarkers = () => {
        setMarkers([
          null, null, null,
          null, null, null,
          null, null, null
        ])
      }
    
      const calculateWinner = (squares) => {
        const lines = [
          [0,1,2],
          [3,4,5],
          [6,7,8],
          [0,3,6],
          [1,4,7],
          [2,5,8],
          [0,4,8],
          [2,4,6]
        ];
        for(let i = 0; i < lines.length; i++){
          const [a,b,c] = lines[i];
          if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
          }
        }
        return null;
      }
    
      useEffect(() => {
        const winner = calculateWinner(markers);
        if(winner === 'X'){
          alert("Player X Won!")
          resetMarkers()
        }else if(winner === 'O'){
          alert("Player O Won!")
          resetMarkers()
        }
      }, [markers])


  return (
    <SafeAreaView style={styles.body}>
    <View style={[styles.playerInfo,{backgroundColor: active_player === 'X'? '#007FF4' : '#F40075'}]}>
      <Text>Player {active_player}'s Turn</Text>
    </View>

      <View style={styles.mainContainer}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((position) => (
          <Pressable
            key={position}
            style={styles.cell}
            onPress={() => markPosition(position)}
          >
            {markers[position] === 'X' && (
               <Image
                source={require('../../assets/cross.png')}
                style={styles.icon}
              />
            )}
            {markers[position] === 'O' && (
              <Image
                source={require('../../assets/zero.png')}
                style={styles.icon}
              />
            )}
            
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.cancelBTN} onPress={resetMarkers}>
        <Image source={require('../../assets/replay.png')} style={styles.cancelIcon}/>
      </Pressable>
    </SafeAreaView>
  )
}

export default TicTacToe

const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: '#fff'
    },
    playerInfo: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 20,
      paddingVertical: 20,
      marginTop:100
    },
    playerTxt: {
      fontSize: 20,
      fontWeight: '700',
      letterSpacing: 1.2,
      color: '#fff'
    },
    mainContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: 60,
    },
    cell:{
        width: windowWidth / 3.2,
          height: windowWidth / 3.2,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRightWidth: 6,
          borderBottomWidth: 6,
    },
    icon: {
      height: 62,
      width: 62
    },
    cancelBTN: {
      position: 'absolute',
      bottom: 20,
      right: 20
    },
    cancelIcon: {
      height: 50,
      width: 50
    },
  })