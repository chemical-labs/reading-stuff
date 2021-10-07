import * as React from 'react'
import { View, Text, Dimensions, StatusBar } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
 
export default class App extends React.Component {
  render() {
      return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
              <StatusBar hidden={true}/>
              <PDFReader 
                  style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: 'white' }}
                  source={{ 
                      uri: 'http://192.168.1.9:5000/books/x.pdf'
                  }}
              />
          </View>
          )
    }
}
