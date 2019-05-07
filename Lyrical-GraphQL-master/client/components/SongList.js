import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';
// import delete from "../queries/deletSong";



class SongList extends Component {

    onSongDelete(id) {
        // NB refreshing
        this.props.mutate({variables: { id: id }})
        .then(() => this.props.data.refetch());
    }
    
    renderSongs() {
        // at begining no data as graphql fetchs asynchronously so have to do case where undefined with every component that fetchs data from graphql

        return this.props.data.songs.map(({id, title}) => {
            return (
                <li key={id} className="collection-item">
                    <Link to={`/songs/${id}`}>
                    {title}
                    </Link>
                    <i className="material-icons" onClick={() => this.onSongDelete(id)}>delete</i>
                    
                </li>
            );
        });
    }

    render() {

        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }
    return (
                
        <div>
            <ul className="collection">
                {this.renderSongs()}
            </ul>
            <Link to="/songs/new" className="btn-floating btn-large red right">
            <i className="material-icons">add</i>
            </Link>
        </div>
        
        );
    }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;
// const delete = delete;

// defining Query (not excuting yet):
// const query = gql`
//     {
//         songs {
//             id
//             title
//         }
//     }
// `;

export default graphql(mutation)(graphql(query)(SongList));