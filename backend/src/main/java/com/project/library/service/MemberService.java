package com.project.library.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.library.entity.Member;
import com.project.library.repository.MemberRepository;

@Service
public class MemberService {
	
	private final MemberRepository memberRepository;
	
	public MemberService(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}
	
	public List<Member> getAllMembers(){
		return memberRepository.findAll();
	}
	
	public Member getMemberById(Long id){
		return memberRepository.findById(id).orElseThrow(()-> new RuntimeException("Book Not Found"));
	}
	
	public Member addMember(Member member) {
		return memberRepository.save(member);
	}
	
	public Member updateMember(Long id, Member member) {
		
		Member existingMember = getMemberById(id);
		
		existingMember.setName(member.getName());
		existingMember.setEmail(member.getEmail());
		existingMember.setPhone(member.getPhone());
		
		return memberRepository.save(existingMember);
	}
	
	public void deleteMember(Long id) {
		memberRepository.deleteById(id);
	}
}
