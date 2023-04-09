package polytech.info4.gl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import polytech.info4.gl.domain.enumeration.Theme;

/**
 * A Commerce.
 */
@Entity
@Table(name = "commerce")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Commerce implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @Enumerated(EnumType.STRING)
    @Column(name = "theme")
    private Theme theme;

    @Column(name = "site", unique = true)
    private String site;

    @OneToMany(mappedBy = "commerce")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "livraison", "clientele", "commerce" }, allowSetters = true)
    private Set<Panier> paniers = new HashSet<>();

    @ManyToOne
    @ManyToOne
    @JsonIgnoreProperties(value = { "clienteles", "livraisons", "commerce", "commerce" }, allowSetters = true)
    private Cooperative cooperative;

    @ManyToOne
    @ManyToOne
    @JsonIgnoreProperties(value = { "clienteles", "livraisons", "commerce", "commerce" }, allowSetters = true)
    private Cooperative cooperative;

    @ManyToMany(mappedBy = "commerce")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "paniers", "commerce", "cooperative" }, allowSetters = true)
    private Set<Clientele> clienteles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Commerce id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Commerce nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Theme getTheme() {
        return this.theme;
    }

    public Commerce theme(Theme theme) {
        this.setTheme(theme);
        return this;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }

    public String getSite() {
        return this.site;
    }

    public Commerce site(String site) {
        this.setSite(site);
        return this;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public Set<Panier> getPaniers() {
        return this.paniers;
    }

    public void setPaniers(Set<Panier> paniers) {
        if (this.paniers != null) {
            this.paniers.forEach(i -> i.setCommerce(null));
        }
        if (paniers != null) {
            paniers.forEach(i -> i.setCommerce(this));
        }
        this.paniers = paniers;
    }

    public Commerce paniers(Set<Panier> paniers) {
        this.setPaniers(paniers);
        return this;
    }

    public Commerce addPanier(Panier panier) {
        this.paniers.add(panier);
        panier.setCommerce(this);
        return this;
    }

    public Commerce removePanier(Panier panier) {
        this.paniers.remove(panier);
        panier.setCommerce(null);
        return this;
    }

    public Cooperative getCooperative() {
        return this.cooperative;
    }

    public void setCooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
    }

    public Commerce cooperative(Cooperative cooperative) {
        this.setCooperative(cooperative);
        return this;
    }

    public Cooperative getCooperative() {
        return this.cooperative;
    }

    public void setCooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
    }

    public Commerce cooperative(Cooperative cooperative) {
        this.setCooperative(cooperative);
        return this;
    }

    public Set<Clientele> getClienteles() {
        return this.clienteles;
    }

    public void setClienteles(Set<Clientele> clienteles) {
        if (this.clienteles != null) {
            this.clienteles.forEach(i -> i.removeCommerce(this));
        }
        if (clienteles != null) {
            clienteles.forEach(i -> i.addCommerce(this));
        }
        this.clienteles = clienteles;
    }

    public Commerce clienteles(Set<Clientele> clienteles) {
        this.setClienteles(clienteles);
        return this;
    }

    public Commerce addClientele(Clientele clientele) {
        this.clienteles.add(clientele);
        clientele.getCommerce().add(this);
        return this;
    }

    public Commerce removeClientele(Clientele clientele) {
        this.clienteles.remove(clientele);
        clientele.getCommerce().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Commerce)) {
            return false;
        }
        return id != null && id.equals(((Commerce) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Commerce{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", theme='" + getTheme() + "'" +
            ", site='" + getSite() + "'" +
            "}";
    }
}
