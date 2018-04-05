import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Slider,
    ActivityIndicator,
    ListView,
    TouchableHighlight
} from 'react-native';
import { executeFetchRequest, urlForSearchtext, urlForInteresting } from '../DataManager';
const ResultsScreen = require('./ResultsScreen');
const DetailScreen = require('./DetailScreen');


class SearchScreen extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource(
            {rowHasChanged: (r1,r2) => r1.id !== r2.id }
        );
        this.state = {
            searchText: 'Spring',
            isLoading: false,
            dataSource: dataSource.cloneWithRows([]),
            photos: []
        };
    }

    // Event handlers
    _onPressSearch() {
        const url = urlForSearchtext(this.state.searchText);
        this.setState({ isLoading: true });
        executeFetchRequest(url, (photos) => {
            this.setState({ isLoading: false });
            this.props.navigator.push ({
                title: this.state.searchText + ' Photos',
                component: ResultsScreen,
                passProps: {photos: photos}
            });
        });
    }


    // Lifecycle
    componentDidMount() {
        const url = urlForInteresting();
        executeFetchRequest(url, (photos) => {
            let dataSource = new ListView.DataSource(
                {rowHasChanged: (r1,r2) => r1.id !== r2.id }
            );
            this.setState({
                isLoading: false,
                dataSource: dataSource.cloneWithRows(photos),
                photos: photos
            });
        });
    }

    render() {
        const spinner = this.state.isLoading ? (<ActivityIndicator size='large'/>) : (<View/>);
        return (
            <View style={styles.root}>
                <View style={styles.topContainer}>
                    <Text style={styles.screenTitle}>Search</Text>
                    <TextInput style={styles.textInput}
                               placeholder='"Anything"'
                               onChangeText={(searchText) => this.setState({searchText})}
                    />
                    {spinner}
                    <TouchableHighlight style={styles.searchButton}
                                        onPress={this._onPressSearch.bind(this)}
                                        underlayColor='#007AFF'>
                        <Text style={styles.buttonText}>GO</Text>
                    </TouchableHighlight>

                </View>
                <View style={styles.bottomContainer}>
                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={1}
                        maximumValue={5}
                        value={this.state.column}
                        onValueChange={val => this.setState({ column: val })}
                    />
                    <Text style={styles.welcome}>
                        {this.state.column}
                    </Text>

                </View>
            </View>
        );
    }
}


// Styles
const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center' ,
    },
    topContainer: {
        margin: 10,
        borderRadius: 10,
        flex: 2,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginBottom: 20
    },
    screenTitle: {
        fontSize: 50,
        fontFamily: 'helvetica',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        color: '#4A4A4A',
    },
    textInput: {
        fontSize: 30,
        fontFamily: 'helvetica',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        color: '#007AFF',
        marginTop: 30,
        height: 64, width: 300
    },
    searchButton: {
        marginTop: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        borderRadius: 20,
        height: 64, width: 64
    },
    buttonText: {
        fontSize: 24,
        fontFamily: 'helvetica',
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    bottomContainer: {
        flex: 2,
        paddingRight: 10
    },
    listContainer: {
        flex: 1
    },
    rowContainer: {
        flex: 5,
        backgroundColor:'transparent',
        paddingLeft: 10, paddingTop: 10, paddingBottom: 10
    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})

module.exports = SearchScreen;