package com.project.library.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.library.entity.Issue;
import com.project.library.service.IssueService;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping
    public List<Issue> getAllIssues() {
        return issueService.getAllIssues();
    }

    @PostMapping("/book/{bookId}/member/{memberId}")
    public Issue issueBook(
            @PathVariable Long bookId,
            @PathVariable Long memberId) {

        return issueService.issueBook(bookId, memberId);
    }

    @PutMapping("/return/{issueId}")
    public Issue returnBook(@PathVariable Long issueId) {
        return issueService.returnBook(issueId);
    }
}
