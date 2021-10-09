// renter dashboard styles.js responsible for design layout

import { StyleSheet } from "react-native";

export default StyleSheet.create({

    homecontainer : {
        flex: 1, 
        backgroundColor: '#fff',
        alignItems: 'top',
        justifyContent: 'top',
        paddingTop: 20,
       
    },
    
    payRentContainer : {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'top',
        paddingTop: '50',
    },

    payRentText : {
        fontSize: 20,
    },


    reportIssueContainer : {},

    reportIssueText : {},

    dueTodayContainer : {},

    dueTodayText : {},

});