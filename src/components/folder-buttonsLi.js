
import React from 'react';
import { Link } from 'react-router-dom';
import './css/folder-card.css'
//USED in userMenu.js and
//FIX ME: Event target sometimes registers the paragraph with the folder name or
// the button. Need to fix so the event listener is on the whole li
export default function FolderButtonLi(props) {
	return (
		<ul folders={props.folders} className="folder-cards">
			{props.folders.map((folder, index) => {
				return (
					<li key={index} className='folder-list-item'>
					<div className='folder-item'>
					<button className="folderButton" type="button">
					<Link to={`/folder/${folder._id}`}>
						<h3>{folder.foldername}</h3>
					</Link>
					</button>
					<button folderid={folder._id} className="deleteLink" onClick={props.deleteClick}>
					X
										</button>
								
									</div>
					</li>
				);
			})}
		</ul>
	);
}
