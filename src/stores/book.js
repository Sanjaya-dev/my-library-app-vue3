import { defineStore } from 'pinia'

export const useBooksStore = defineStore('book', {
  state: () => ({
    books: [
      {
        id: 1,
        title: 'Atomic Habits',
        author: 'James Clear',
        year: 2018,
        genre: 'Self-Help',
        available: true,
        cover: 'https://example.com/atomic-habits.jpg',
      },
      {
        id: 2,
        title: 'The Power of Now',
        author: 'Eckhart Tolle',
        year: 1997,
        genre: 'Self-Help',
        available: true,
        cover: 'https://example.com/the-power-of-now.jpg',
      },
      {
        id: 3,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        year: 1988,
        genre: 'Fiction',
        available: true,
        cover: 'https://example.com/the-alchemist.jpg',
      },
    ],
    searchQuery: '',
    filterGenre: '',
  }),

  getters: {
    //getters untuk melakukan filter buku berdasarkan pencarian atau genre
    filterbooks: (state) => {
      return state.books.filter((book) => {
        const matchesSearch =
          book.title.toLocaleLowerCase().includes(state.searchQuery.toLocaleLowerCase()) ||
          book.author.toLocaleLowerCase().includes(state.searchQuery.toLocaleLowerCase())
        const matchesGenre = state.filterGenre === '' || book.genre === state.filterGenre
        return matchesSearch && matchesGenre
      })
    },

    //menghitung total buku yang tersedia
    availableBooks: (state) => {
      return state.books.filter((book) => book.available).length
    },

    //mendapatkan genre unik untuk filter
    genres: (state) => {
      return [...new Set(state.books.map((book) => book.genre))]
    }
  },

  actions: {
    //menambah buku baru
    addBook(book) {
        const newId = Math.max(...this.books.map(b => b.id)) + 1;
        this.books.push({
            id: newId,
            ...book,
            available: true
        }); 
    },

    //meminjam buku
    borrowBook(bookId){
        const book = this.books.find(b => b.id === bookId);
        if(book && book.available) {
            book.available = false;
        }
    },

    //mengembalikan buku
    returnBook(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if(book && !book.available) {
            book.available = true;
        }
    },

    //mengatur filter pencarian
    setSearchQuery(query) {
      this.searchQuery = query;
    },

    //mengatur filter genre
    setFilterGenre(genre) {
      this.filterGenre = genre;
    }
  }


})
