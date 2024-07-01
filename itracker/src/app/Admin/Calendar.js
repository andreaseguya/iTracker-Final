import { StyleSheet, Text, View, TouchableOpacity } from 'react-native-web'
import moment from 'moment'
export default function Calendar() {
    const Date = ({ date, onSelectDate, selected }) => {
        const day = moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? 'Today' : moment(date).format('ddd')
    }
    return (
        <div class="mt-1 ml-2">

        </div>
    )
}