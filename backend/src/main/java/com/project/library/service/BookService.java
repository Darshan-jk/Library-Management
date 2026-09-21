package com.project.library.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.library.entity.Book;
import com.project.library.repository.BookRepository;

@Service
public class BookService {
	
	private final BookRepository bookRepository;
	
	public BookService(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}
	
	public List<Book> getAllBooks(){
		return bookRepository.findAll();
	}
	
	public Book getBookById(Long id){
		return bookRepository.findById(id).orElseThrow(()-> new RuntimeException("Book Not Found"));
	}
	
	public Book addBook(Book book) {
		return bookRepository.save(book);
	}
	
	public Book updateBook(Long id, Book book) {
		
		Book existingBook = getBookById(id);
		
		existingBook.setTitle(book.getTitle());
		existingBook.setAuthor(book.getAuthor());
		existingBook.setIsbn(book.getIsbn());
		existingBook.setQuantity(book.getQuantity());
		
		return bookRepository.save(existingBook);
	}
	
	public void deleteBook(Long id) {
		bookRepository.deleteById(id);
	}
	
}
