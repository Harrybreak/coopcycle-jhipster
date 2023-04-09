package polytech.info4.gl.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import polytech.info4.gl.domain.Clientele;
import polytech.info4.gl.repository.ClienteleRepository;
import polytech.info4.gl.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link polytech.info4.gl.domain.Clientele}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ClienteleResource {

    private final Logger log = LoggerFactory.getLogger(ClienteleResource.class);

    private static final String ENTITY_NAME = "clientele";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClienteleRepository clienteleRepository;

    public ClienteleResource(ClienteleRepository clienteleRepository) {
        this.clienteleRepository = clienteleRepository;
    }

    /**
     * {@code POST  /clienteles} : Create a new clientele.
     *
     * @param clientele the clientele to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new clientele, or with status {@code 400 (Bad Request)} if the clientele has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/clienteles")
    public ResponseEntity<Clientele> createClientele(@RequestBody Clientele clientele) throws URISyntaxException {
        log.debug("REST request to save Clientele : {}", clientele);
        if (clientele.getId() != null) {
            throw new BadRequestAlertException("A new clientele cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Clientele result = clienteleRepository.save(clientele);
        return ResponseEntity
            .created(new URI("/api/clienteles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /clienteles/:id} : Updates an existing clientele.
     *
     * @param id the id of the clientele to save.
     * @param clientele the clientele to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clientele,
     * or with status {@code 400 (Bad Request)} if the clientele is not valid,
     * or with status {@code 500 (Internal Server Error)} if the clientele couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/clienteles/{id}")
    public ResponseEntity<Clientele> updateClientele(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Clientele clientele
    ) throws URISyntaxException {
        log.debug("REST request to update Clientele : {}, {}", id, clientele);
        if (clientele.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, clientele.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!clienteleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Clientele result = clienteleRepository.save(clientele);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, clientele.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /clienteles/:id} : Partial updates given fields of an existing clientele, field will ignore if it is null
     *
     * @param id the id of the clientele to save.
     * @param clientele the clientele to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clientele,
     * or with status {@code 400 (Bad Request)} if the clientele is not valid,
     * or with status {@code 404 (Not Found)} if the clientele is not found,
     * or with status {@code 500 (Internal Server Error)} if the clientele couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/clienteles/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Clientele> partialUpdateClientele(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Clientele clientele
    ) throws URISyntaxException {
        log.debug("REST request to partial update Clientele partially : {}, {}", id, clientele);
        if (clientele.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, clientele.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!clienteleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Clientele> result = clienteleRepository
            .findById(clientele.getId())
            .map(existingClientele -> {
                return existingClientele;
            })
            .map(clienteleRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, clientele.getId().toString())
        );
    }

    /**
     * {@code GET  /clienteles} : get all the clienteles.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of clienteles in body.
     */
    @GetMapping("/clienteles")
    public List<Clientele> getAllClienteles(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Clienteles");
        if (eagerload) {
            return clienteleRepository.findAllWithEagerRelationships();
        } else {
            return clienteleRepository.findAll();
        }
    }

    /**
     * {@code GET  /clienteles/:id} : get the "id" clientele.
     *
     * @param id the id of the clientele to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the clientele, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/clienteles/{id}")
    public ResponseEntity<Clientele> getClientele(@PathVariable Long id) {
        log.debug("REST request to get Clientele : {}", id);
        Optional<Clientele> clientele = clienteleRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(clientele);
    }

    /**
     * {@code DELETE  /clienteles/:id} : delete the "id" clientele.
     *
     * @param id the id of the clientele to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/clienteles/{id}")
    public ResponseEntity<Void> deleteClientele(@PathVariable Long id) {
        log.debug("REST request to delete Clientele : {}", id);
        clienteleRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
