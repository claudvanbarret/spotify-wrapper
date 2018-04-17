import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai  from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { search, searchAlbuns, searchArtists, searchTracks, searchPlaylists } from '../src/main';

describe('Spotify Wrapper', () => {
  let fetchStub;
  let promise;

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
    promise = fetchStub.returnsPromise();
  });

  afterEach(() => {
    fetchStub.restore();
  });

  describe('Smoke tests', () => {

    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbuns method', () => {
      expect(searchAlbuns).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });

  });

  describe('Generic Search', () => {

    it('should call fetch function', () => {
      const artists = search(); 

      expect(fetchStub).to.have.been.calledOnce;
    });

    it('shoulf receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist');

        expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
      });

      context('passing more than one type', () => {
        const artists = search('Incubus', ['artist', 'album']);

        expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });

    it('should return the JSON Data from the Promise', () => {
      promise.resolve({ 'body': 'json'});
      const artists = search('Incubus', 'artist');

      expect(artists.resolveValue).to.be.eql({ 'body': 'json'});
    });
  });

  describe('searchArtist', () => {
    it('should call fetch function', () => {
      const artist = searchArtists('Incubus');
      expect(fetchStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artist = searchArtists('Incubus');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbuns('Incubus');
      expect(fetchStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = searchAlbuns('Incubus');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
    });
  });

  describe('searchTrack', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('Incubus');
      expect(fetchStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = searchTracks('Incubus');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');
    });
  }); 

  describe('searchPlaylist', () => {
    it('should call fetch function', () => {
      const artist = searchPlaylists('Incubus');
      expect(fetchStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artist = searchPlaylists('Incubus');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');
    });
  });
});
