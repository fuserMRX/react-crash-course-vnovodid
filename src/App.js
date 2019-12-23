import React, { Suspense } from "react";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
const Profile = React.lazy(() => import("./Profile")); // dynamic import

export default function App() {
    return (
        <>
            <Provider store={store}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Profile />
                </Suspense>
            </Provider>
        </>
    );
}
