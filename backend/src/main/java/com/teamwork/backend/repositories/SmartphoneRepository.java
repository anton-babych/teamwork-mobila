package com.teamwork.backend.repositories;

import com.teamwork.backend.entities.Smartphone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;


public interface SmartphoneRepository extends JpaRepository<Smartphone, Long> {

    List<Smartphone> findBySmodelContaining(String smodel);

    List<Smartphone> findSmartphonesByHeadphonesId(Long headphoneId);
}
