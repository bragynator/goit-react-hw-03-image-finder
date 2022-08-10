import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    galleryItems: [],
    searchQueue: '',
    page: 1,
    isLoading: false,
    showModal: false,
    modalId: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQueue !== this.state.searchQueue ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.state.searchQueue}&page=${String(
          this.state.page
        )}&key=27493415-caff1e79bf6baf64c8d3710ef&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data => {
          if (data.hits.length === 0) {
            alert(`Sorry, we didn't find anything!`);
            return;
          }

          this.setState(prev => ({
            galleryItems: [...prev.galleryItems, ...data.hits],
          }));
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  handleSubmit = searchQueue => {
    if (searchQueue === '') {
      alert('Please, enter search query!');
      return;
    }

    this.setState({ galleryItems: [], searchQueue, page: 1 });
  };

  handleLoadMoreClick = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  showModal = id => {
    this.setState({
      showModal: true,
      modalId: id,
    });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const currentModalPicture = this.state.galleryItems.find(
      item => item.id === this.state.modalId
    );

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.galleryItems.length > 0 && (
          <ImageGallery
            items={this.state.galleryItems}
            showModal={this.showModal}
          />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.galleryItems.length > 0 && (
          <LoadMoreButton onClick={this.handleLoadMoreClick} />
        )}
        {this.state.showModal && (
          <Modal item={currentModalPicture} onClose={this.hideModal} />
        )}
      </div>
    );
  }
}
