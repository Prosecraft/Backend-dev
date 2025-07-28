package com.prosecraft.grammar;

import com.prosecraft.grammar.GrammarCheck;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GrammarCheckRepository extends JpaRepository<GrammarCheck, Long> {
    List<GrammarCheck> findByUserEmail(String email);
}
