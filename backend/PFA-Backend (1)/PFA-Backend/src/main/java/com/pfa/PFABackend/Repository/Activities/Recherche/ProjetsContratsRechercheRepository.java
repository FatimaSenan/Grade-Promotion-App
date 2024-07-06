package com.pfa.PFABackend.Repository.Activities.Recherche;

import com.pfa.PFABackend.Model.Activities.Recherche.ProjetsContratsRecherche;
import com.pfa.PFABackend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjetsContratsRechercheRepository extends JpaRepository<ProjetsContratsRecherche, Integer> {
    public List<ProjetsContratsRecherche> findByUser(User user);
}