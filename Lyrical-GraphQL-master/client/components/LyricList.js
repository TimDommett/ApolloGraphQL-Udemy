import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
// import { Link } from 'react-router';
// import query from '../queries/fetchSongs';



class LyricList extends Component {

    onLike(id, likes) {
        // NB refreshing
        this.props.mutate({ 
            variables: { id: id },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        });
            // .then(() => this.props.data.refetch());
    }

    renderLyrics() {
    //     // at begining no data as graphql fetchs asynchronously so have to do case where undefined with every component that fetchs data from graphql
 
        return this.props.lyrics.map(({ id, content, likes }) => {
            return (
                <li key={id} className="collection-item">
                    {/* <Link to={`/songs/${id}`}>
                        {title}
                    </Link> */}
                    {content}
                    <i className="material-icons" onClick={() => this.onLike(id, likes)}>thumb_up</i>
                    {likes}
                </li>
            );
        });
    }

    render() {

        // const { lyrics } = this.props.data;

        // if (!lyrics) { return <div>Nothing Here</div> }

        return (
            <ul className="collection">
                {this.renderLyrics()}
                <i></i>
            </ul>

        );
    }}

const mutation = gql` 
    mutation LikeLyric($id: ID) {
        likeLyric(id: $id) {
            id
            likes
        }
    }
`;

export default graphql(mutation)(LyricList);
// export default graphql(mutation)(graphql(query)(LyricList));