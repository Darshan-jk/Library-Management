package com.project.library.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.library.entity.Book;
import com.project.library.entity.Issue;
import com.project.library.entity.Member;
import com.project.library.repository.BookRepository;
import com.project.library.repository.IssueRepository;
import com.project.library.repository.MemberRepository;

@Service
public class IssueService {
	
	private final IssueRepository issueRepository;
	private final BookRepository bookRepository;
	private final MemberRepository memberRepository;
	
	public IssueService(IssueRepository issueRepository, BookRepository bookRepository,
			MemberRepository memberRepository) {
		this.issueRepository = issueRepository;
		this.bookRepository = bookRepository;
		this.memberRepository = memberRepository;
	}
	
	public Issue issueBook(Long bookId, Long memberId) {
		
		Book book = bookRepository.findById(bookId).orElseThrow(()-> new RuntimeException("Book not Found"));
		Member member = memberRepository.findById(memberId).orElseThrow(()-> new RuntimeException("Member not Found"));
		
		if(book.getQuantity() <= 0) {
			throw new RuntimeException("Book is Not Available");
		}
		
		book.setQuantity(book.getQuantity() - 1);
		
		bookRepository.save(book);
		
		Issue issue = new Issue();
		
		issue.setBook(book);
		issue.setMember(member);
		issue.setIssueDate(LocalDate.now());
		issue.setStatus("ISSUED");
		
		return issueRepository.save(issue);
	}
	
	public List<Issue> getAllIssues(){
		return issueRepository.findAll();
	}
	
	public Issue returnBook(Long issueId) {
			
			Issue issue = issueRepository.findById(issueId).orElseThrow(()-> new RuntimeException("Issue Record not Found"));
			
			if("RETURNED".equals(issue.getStatus())) {
				throw new RuntimeException("Book Already Returned");
			}
			
			Book book = issue.getBook();
			
			book.setQuantity(book.getQuantity() + 1);
			
			bookRepository.save(book);
			
			issue.setReturnDate(LocalDate.now());
			issue.setStatus("RETURNED");
			
			return issueRepository.save(issue);
		}
	
	
}
