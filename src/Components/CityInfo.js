import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_CITY = gql`
    query City($zipCode: String!){
        city(zipCode: $zipCode){
            id
            zipCode
            name
            temp
            timeZone
            elevation
            lat
            lon
        }
    }
`;


const CityInfo = ({ zipCode }) => (
    <Query
        query={GET_CITY}
        variables={{ zipCode }}
        skip={!zipCode}
        notifyOnNetworkStatusChange
    >
        {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error ${error}</div>;

            return (
                <p>
                    At the location {data.city.name}, the temperature is {Math.round(((data.city.temp-273.15)*1.8)+32)} ℉,
                    the timezone is {data.city.timeZone}, and the elevation is {Math.round(3.2808*data.city.elevation)} ft.
                </p>
            )
        }}
    </Query>
)

export default CityInfo;