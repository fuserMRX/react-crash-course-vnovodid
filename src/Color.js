import React from "react";

export const Color = React.createContext("red");

export function withColor(Component) {
    return class ColorWrapper extends React.Component {
        render() {
            return (
                <Color.Consumer>
                    {value => <Component {...this.props} color={value} />}
                </Color.Consumer>
            );
        }
    };
}
