package polytech.info4.gl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import polytech.info4.gl.IntegrationTest;
import polytech.info4.gl.domain.Clientele;
import polytech.info4.gl.repository.ClienteleRepository;

/**
 * Integration tests for the {@link ClienteleResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class ClienteleResourceIT {

    private static final String ENTITY_API_URL = "/api/clienteles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ClienteleRepository clienteleRepository;

    @Mock
    private ClienteleRepository clienteleRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restClienteleMockMvc;

    private Clientele clientele;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Clientele createEntity(EntityManager em) {
        Clientele clientele = new Clientele();
        return clientele;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Clientele createUpdatedEntity(EntityManager em) {
        Clientele clientele = new Clientele();
        return clientele;
    }

    @BeforeEach
    public void initTest() {
        clientele = createEntity(em);
    }

    @Test
    @Transactional
    void createClientele() throws Exception {
        int databaseSizeBeforeCreate = clienteleRepository.findAll().size();
        // Create the Clientele
        restClienteleMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(clientele))
            )
            .andExpect(status().isCreated());

        // Validate the Clientele in the database
        List<Clientele> clienteleList = clienteleRepository.findAll();
        assertThat(clienteleList).hasSize(databaseSizeBeforeCreate + 1);
        Clientele testClientele = clienteleList.get(clienteleList.size() - 1);
    }

    @Test
    @Transactional
    void createClienteleWithExistingId() throws Exception {
        // Create the Clientele with an existing ID
        clientele.setId(1L);

        int databaseSizeBeforeCreate = clienteleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restClienteleMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(clientele))
            )
            .andExpect(status().isBadRequest());

        // Validate the Clientele in the database
        List<Clientele> clienteleList = clienteleRepository.findAll();
        assertThat(clienteleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllClienteles() throws Exception {
        // Initialize the database
        clienteleRepository.saveAndFlush(clientele);

        // Get all the clienteleList
        restClienteleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clientele.getId().intValue())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllClientelesWithEagerRelationshipsIsEnabled() throws Exception {
        when(clienteleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restClienteleMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(clienteleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllClientelesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(clienteleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restClienteleMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(clienteleRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getClientele() throws Exception {
        // Initialize the database
        clienteleRepository.saveAndFlush(clientele);

        // Get the clientele
        restClienteleMockMvc
            .perform(get(ENTITY_API_URL_ID, clientele.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(clientele.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingClientele() throws Exception {
        // Get the clientele
        restClienteleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingClientele() throws Exception {
        // Initialize the database
        clienteleRepository.saveAndFlush(clientele);

        int databaseSizeBeforeUpdate = clienteleRepository.findAll().size();

        // Update the clientele
        Clientele updatedClientele = clienteleRepository.findById(clientele.getId()).get();
        // Disconnect from session so that the updates on updatedClientele are not directly saved in db
        em.detach(updatedClientele);

        restClienteleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedClientele.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedClientele))
            )
            .andExpect(status().isOk());

        // Validate the Clientele in the database
        List<Clientele> clienteleList = clienteleRepository.findAll();
        assertThat(clienteleList).hasSize(databaseSizeBeforeUpdate);
        Clientele testClientele = clienteleList.get(clienteleList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingClientele() throws Exception {
        int databaseSizeBeforeUpdate = clienteleRepository.findAll().size();
        clientele.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClienteleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, clientele.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(clientele))
            )
            .andExpect(status().isBadRequest());

        // Validate the Clientele in the database
        List<Clientele> clienteleList = clienteleRepository.findAll();
        assertThat(clienteleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchClientele() throws Exception {
        int databaseSizeBeforeUpdate = clienteleRepository.findAll().size();
        clientele.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClienteleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(clientele))
            )
            .andExpect(status().isBadRequest());

        // Validate the Clientele in the database
        List<Clientele> clienteleList = clienteleRepository.findAll();
        assertThat(clienteleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamClientele() throws Exception {
        int databaseSizeBeforeUpdate = clienteleRepository.findAll().size();
        clientele.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClienteleMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(clientele))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Clientele in the database
        List<Clientele> clienteleList = clienteleRepository.findAll();
        assertThat(clienteleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateClienteleWithPatch() throws Exception {
        // Initialize the database
        clienteleRepository.saveAndFlush(clientele);

        int databaseSizeBeforeUpdate = clienteleRepository.findAll().size();

        // Update the clientele using partial update
        Clientele partialUpdatedClientele = new Clientele();
        partialUpdatedClientele.setId(clientele.getId());

        restClienteleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedClientele.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedClientele))
            )
            .andExpect(status().isOk());

        // Validate the Clientele in the database
        List<Clientele> clienteleList = clienteleRepository.findAll();
        assertThat(clienteleList).hasSize(databaseSizeBeforeUpdate);
        Clientele testClientele = clienteleList.get(clienteleList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateClienteleWithPatch() throws Exception {
        // Initialize the database
        clienteleRepository.saveAndFlush(clientele);

        int databaseSizeBeforeUpdate = clienteleRepository.findAll().size();

        // Update the clientele using partial update
        Clientele partialUpdatedClientele = new Clientele();
        partialUpdatedClientele.setId(clientele.getId());

        restClienteleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedClientele.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedClientele))
            )
            .andExpect(status().isOk());

        // Validate the Clientele in the database
        List<Clientele> clienteleList = clienteleRepository.findAll();
        assertThat(clienteleList).hasSize(databaseSizeBeforeUpdate);
        Clientele testClientele = clienteleList.get(clienteleList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingClientele() throws Exception {
        int databaseSizeBeforeUpdate = clienteleRepository.findAll().size();
        clientele.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClienteleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, clientele.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(clientele))
            )
            .andExpect(status().isBadRequest());

        // Validate the Clientele in the database
        List<Clientele> clienteleList = clienteleRepository.findAll();
        assertThat(clienteleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchClientele() throws Exception {
        int databaseSizeBeforeUpdate = clienteleRepository.findAll().size();
        clientele.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClienteleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(clientele))
            )
            .andExpect(status().isBadRequest());

        // Validate the Clientele in the database
        List<Clientele> clienteleList = clienteleRepository.findAll();
        assertThat(clienteleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamClientele() throws Exception {
        int databaseSizeBeforeUpdate = clienteleRepository.findAll().size();
        clientele.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClienteleMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(clientele))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Clientele in the database
        List<Clientele> clienteleList = clienteleRepository.findAll();
        assertThat(clienteleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteClientele() throws Exception {
        // Initialize the database
        clienteleRepository.saveAndFlush(clientele);

        int databaseSizeBeforeDelete = clienteleRepository.findAll().size();

        // Delete the clientele
        restClienteleMockMvc
            .perform(delete(ENTITY_API_URL_ID, clientele.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Clientele> clienteleList = clienteleRepository.findAll();
        assertThat(clienteleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
