package com.project.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.library.entity.Issue;

public interface IssueRepository extends JpaRepository<Issue, Long> {

}
