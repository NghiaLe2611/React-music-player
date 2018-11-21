import React, { Component } from 'react';

export default class SongItem extends Component {
    
    render() {
        let myItem = this.props;        
        
      
        let active= myItem.playing === myItem.url ? 'active' : '';
        
        return (
            <li className={'song-item ' + active} data-src={myItem.url} data-duration={myItem.duration}>
                <span className="id" >{myItem.id}</span>  <span className="playing"></span>
                <span className="name"><a href={myItem.url} onClick={myItem.handleClick}>{myItem.name}</a></span>
                <span className="artist">{myItem.artist}</span>  
                <span className="duration">{myItem.duration}</span>  
            </li>
        );
    }
}