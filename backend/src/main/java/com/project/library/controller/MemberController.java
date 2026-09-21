package com.project.library.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.library.entity.Member;
import com.project.library.service.MemberService;

@RestController
@RequestMapping("/api/members")
public class MemberController {
	
	private MemberService memberService;
	
	public MemberController(MemberService memberService) {
		this.memberService = memberService;
	}
	
	@GetMapping
	public List<Member> getAllMembers(){
		return memberService.getAllMembers();
	}
	
	@GetMapping("/{id}")
	public Member getMemberById(@PathVariable Long id) {
		return memberService.getMemberById(id);
	}
	
	@PostMapping
	public Member addMember(@RequestBody Member member) {
		return memberService.addMember(member);
	}
	
	@PutMapping("/{id}")
	public Member updateMember(@PathVariable Long id, @RequestBody Member member) {
		return memberService.updateMember(id, member);
	}
	
	@DeleteMapping("/{id}")
	public String deleteMember(@PathVariable Long id) {
		memberService.deleteMember(id);
		return "Member deleted successfully";
	}
}
