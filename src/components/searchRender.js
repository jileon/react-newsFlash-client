import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import FolderAddToList from './folder-addToList';
import "./css/search-list.css"


class SearchRender extends React.Component {

	renderResults() {
		if (this.props.loading) {
			return <Spinner spinnername="circle" fadeIn='none' />;
		}


		const searchRes = this.props.searchResults.map((article, index) => (
			<li key={index} className='searchResult'>
				<article>
					<img src={article.urlToImage} alt={article.title}></img>
					<a href={article.url} target="_blank" rel="noopener noreferrer">
					<h4>{article.title}</h4>
					</a>
						<h3> {article.source.name}</h3>		
					<p>{article.description}</p>
					<FolderAddToList
					folders={this.props.folders}
					articletitle={article.title}
					articledescription={article.description}
					articleimage={article.urlToImage}
					articleurl={article.url}
					articlesource={article.source.name}
				/>
				</article>
			
			</li>


		));

		return <ul className="article-search-results">{searchRes}</ul>;
	}

	render() {
		return <div className={this.props.className}>
		{this.renderResults()}
		</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		search: state.search.searchTerm,
		loading: state.search.searchloading,
		searchResults: state.search.searchResults,
		folders: state.protectedData.data
	};
};
export default connect(mapStateToProps)(SearchRender);
