package com.teamwork.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "headphones")
public class Headphone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "h_img")
    private String h_img;

    @Column(name = "h_firm")
    private String h_firm;

    @Column(name = "h_model")
    private String h_model;

    @Column(name = "h_price")
    private Integer h_price;

    @Column(name = "h_des")
    private String h_des;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "headphones")
    @JsonIgnore
    private Set<Smartphone> smartphones = new HashSet<>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getH_img() {
        return h_img;
    }

    public void setH_img(String h_img) {
        this.h_img = h_img;
    }

    public String getH_firm() {
        return h_firm;
    }

    public void setH_firm(String h_firm) {
        this.h_firm = h_firm;
    }

    public String getH_model() {
        return h_model;
    }

    public void setH_model(String h_model) {
        this.h_model = h_model;
    }

    public Integer getH_price() {
        return h_price;
    }

    public void setH_price(Integer h_price) {
        this.h_price = h_price;
    }

    public String getH_des() {
        return h_des;
    }

    public void setH_des(String h_des) {
        this.h_des = h_des;
    }

    public Headphone() {

    }

    public Set<Smartphone> getSmartphones() {
        return smartphones;
    }

    public void setSmartphones(Set<Smartphone> smartphones) {
        this.smartphones = smartphones;
    }
}