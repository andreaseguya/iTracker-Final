
'use client'; // Important for client-side rendering

import { Provider } from 'react-redux';
import store from './Redux/store';

export default function ReduxProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}