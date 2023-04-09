package polytech.info4.gl.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import polytech.info4.gl.domain.Commerce;
import polytech.info4.gl.repository.CommerceRepository;
import polytech.info4.gl.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link polytech.info4.gl.domain.Commerce}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CommerceResource {

    private final Logger log = LoggerFactory.getLogger(CommerceResource.class);

    private static final String ENTITY_NAME = "commerce";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommerceRepository commerceRepository;

    public CommerceResource(CommerceRepository commerceRepository) {
        this.commerceRepository = commerceRepository;
    }

    /**
     * {@code POST  /commerce} : Create a new commerce.
     *
     * @param commerce the commerce to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new commerce, or with status {@code 400 (Bad Request)} if the commerce has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/commerce")
    public ResponseEntity<Commerce> createCommerce(@Valid @RequestBody Commerce commerce) throws URISyntaxException {
        log.debug("REST request to save Commerce : {}", commerce);
        if (commerce.getId() != null) {
            throw new BadRequestAlertException("A new commerce cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Commerce result = commerceRepository.save(commerce);
        return ResponseEntity
            .created(new URI("/api/commerce/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /commerce/:id} : Updates an existing commerce.
     *
     * @param id the id of the commerce to save.
     * @param commerce the commerce to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commerce,
     * or with status {@code 400 (Bad Request)} if the commerce is not valid,
     * or with status {@code 500 (Internal Server Error)} if the commerce couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/commerce/{id}")
    public ResponseEntity<Commerce> updateCommerce(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Commerce commerce
    ) throws URISyntaxException {
        log.debug("REST request to update Commerce : {}, {}", id, commerce);
        if (commerce.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, commerce.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!commerceRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Commerce result = commerceRepository.save(commerce);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, commerce.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /commerce/:id} : Partial updates given fields of an existing commerce, field will ignore if it is null
     *
     * @param id the id of the commerce to save.
     * @param commerce the commerce to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commerce,
     * or with status {@code 400 (Bad Request)} if the commerce is not valid,
     * or with status {@code 404 (Not Found)} if the commerce is not found,
     * or with status {@code 500 (Internal Server Error)} if the commerce couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/commerce/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Commerce> partialUpdateCommerce(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Commerce commerce
    ) throws URISyntaxException {
        log.debug("REST request to partial update Commerce partially : {}, {}", id, commerce);
        if (commerce.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, commerce.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!commerceRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Commerce> result = commerceRepository
            .findById(commerce.getId())
            .map(existingCommerce -> {
                if (commerce.getNom() != null) {
                    existingCommerce.setNom(commerce.getNom());
                }
                if (commerce.getTheme() != null) {
                    existingCommerce.setTheme(commerce.getTheme());
                }
                if (commerce.getSite() != null) {
                    existingCommerce.setSite(commerce.getSite());
                }

                return existingCommerce;
            })
            .map(commerceRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, commerce.getId().toString())
        );
    }

    /**
     * {@code GET  /commerce} : get all the commerce.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of commerce in body.
     */
    @GetMapping("/commerce")
    public List<Commerce> getAllCommerce() {
        log.debug("REST request to get all Commerce");
        return commerceRepository.findAll();
    }

    /**
     * {@code GET  /commerce/:id} : get the "id" commerce.
     *
     * @param id the id of the commerce to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the commerce, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/commerce/{id}")
    public ResponseEntity<Commerce> getCommerce(@PathVariable Long id) {
        log.debug("REST request to get Commerce : {}", id);
        Optional<Commerce> commerce = commerceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(commerce);
    }

    /**
     * {@code DELETE  /commerce/:id} : delete the "id" commerce.
     *
     * @param id the id of the commerce to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/commerce/{id}")
    public ResponseEntity<Void> deleteCommerce(@PathVariable Long id) {
        log.debug("REST request to delete Commerce : {}", id);
        commerceRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
