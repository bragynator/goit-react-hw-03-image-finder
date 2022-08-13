import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PER_PAGE = 12;

export class App extends Component {
  state = {
    galleryItems: [],
    searchQueue: '',
    page: 1,
    isLoading: false,
    showModal: false,
    modalId: null,
    showLoadMoreBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQueue !== this.state.searchQueue ||
      prevState.page !== this.state.page
    ) {
      this.setState({
        isLoading: true,
        showLoadMoreBtn: false,
      });
      fetch(
        `https://pixabay.com/api/?q=${this.state.searchQueue}&page=${String(
          this.state.page
        )}&key=27493415-caff1e79bf6baf64c8d3710ef&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
      )
        .then(res => res.json())
        .then(data => {
          if (data.hits.length === 0 && this.state.galleryItems.length === 0) {
            toast.error(`Sorry, we didn't find anything!`);
            return;
          }

          this.setState(prev => ({
            galleryItems: [...prev.galleryItems, ...data.hits],
          }));

          data.hits.length === PER_PAGE
            ? this.setState({ showLoadMoreBtn: true })
            : toast.info(`Oops, it's the end of the collection. Try next.`);
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  handleSubmit = searchQueue => {
    if (searchQueue === '') {
      toast.warn('Please, enter the search query!');
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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.galleryItems.length > 0 && (
          <ImageGallery
            items={this.state.galleryItems}
            showModal={this.showModal}
          />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.showLoadMoreBtn && (
          <LoadMoreButton onClick={this.handleLoadMoreClick} />
        )}
        {this.state.showModal && (
          <Modal item={currentModalPicture} onClose={this.hideModal} />
        )}
      </div>
    );
  }
}
