package com.teamwork.backend.controllers;

import com.teamwork.backend.entities.Smartphone;
import com.teamwork.backend.repositories.SmartphoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class SmartphoneController {
    @Autowired
    SmartphoneRepository smartphoneRepository;

    @GetMapping("/smartphones")
    public ResponseEntity<List<Smartphone>> getAllSmartphones(@RequestParam(required = false) String smodel) {
        List<Smartphone> smartphones = new ArrayList<Smartphone>();

        if (smodel == null)
            smartphoneRepository.findAll().forEach(smartphones::add);
        else
            smartphoneRepository.findBySmodelContaining(smodel).forEach(smartphones::add);

        if (smartphones.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(smartphones, HttpStatus.OK);
    }

    @GetMapping("/smartphones/{id}")
    public ResponseEntity<Smartphone> getSmartphoneById(@PathVariable("id") long id) {
        Smartphone smartphone = smartphoneRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Smartphone with id = " + id));

        return new ResponseEntity<>(smartphone, HttpStatus.OK);
    }

    @PostMapping("/add/smartphones")
    public ResponseEntity<Smartphone> createSmartphone(@RequestBody Smartphone smartphone) {
        Smartphone _smartphone = smartphoneRepository.save(new Smartphone(smartphone.getS_img(), smartphone.getS_firm(), smartphone.getSmodel(), smartphone.getS_price(), smartphone.getS_des()));
        return new ResponseEntity<>(_smartphone, HttpStatus.CREATED);
    }

    @PutMapping("/update/smartphones/{id}")
    public ResponseEntity<Smartphone> updateSmartphone(@PathVariable("id") long id, @RequestBody Smartphone smartphone) {
        Smartphone _smartphone = smartphoneRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Smartphone with id = " + id));

        _smartphone.setS_img(smartphone.getS_img());
        _smartphone.setS_firm(smartphone.getS_firm());
        _smartphone.setSmodel(smartphone.getSmodel());
        _smartphone.setS_price(smartphone.getS_price());
        _smartphone.setS_des(smartphone.getS_des());

        return new ResponseEntity<>(smartphoneRepository.save(_smartphone), HttpStatus.OK);
    }

    @DeleteMapping("/delete/smartphones/{id}")
    public ResponseEntity<HttpStatus> deleteSmartphone(@PathVariable("id") long id) {
        smartphoneRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/delete/smartphones")
    public ResponseEntity<HttpStatus> deleteAllSmartphones() {
        smartphoneRepository.deleteAll();

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}