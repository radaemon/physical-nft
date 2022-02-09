// this file intention is to seed the DB.
import { AlbumDb, ArtistDb, SongDb } from '@/constants/firestore-types'
import {
  GetTopAlbumsRes,
  GetTopArtistsRes,
  GetAlbumInfoRes,
} from '@/constants/lastfm-types'
import { db } from '@/lib/server'
import {
  createArtist,
  createArtistsBatch,
} from '@/lib/server/server-firebase-helpers'
import to from 'await-to-js'
import axios from 'axios'
import { flatten, map, orderBy, range } from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'

const lastFmBaseUrl = `https://ws.audioscrobbler.com/2.0` as const
const lastFmApi = `api_key=${process.env.LASTFM_API_KEY}` as const

async function getTopArtistsByPageLastFM(pages: number) {
  const getTopArtistsUrl =
    `${lastFmBaseUrl}?method=chart.gettopartists&format=json&${lastFmApi}` as const

  return Promise.all(
    range(1, pages + 1).map(async (i) => {
      const [err, res] = await to(
        axios.get<GetTopArtistsRes>(getTopArtistsUrl + `&page=${i}`)
      )
      if (!res) throw new Error(err?.message)

      return map(
        orderBy(res.data.artists.artist, ['playcount'], ['desc']),
        ({ mbid, name, image }) =>
          ({
            mbid,
            stageName: name,
            image: image[image.length - 1]['#text'],
          } as ArtistDb)
      )
    })
  )
}

async function getArtistTopAlbumsArrByPage(artist: string, page: number) {
  const getTopAlbumsUrl = `${lastFmBaseUrl}?method=artist.gettopalbums&format=json&${lastFmApi}&artist=${artist}&page=${page}`
  const [_, res] = await to(axios.get<GetTopAlbumsRes>(getTopAlbumsUrl))
  if (!res) throw new Error('Failed to fetch from API.')
  const albumArrForFirestore = res.data.topalbums.album.map((a) => {
    // for each album call the artist info to get the genres
    // and release date along with summary
    return {
      name: a.name,
      image: a.image[a.image.length - 1]['#text'],
    } as AlbumDb
  })
  return albumArrForFirestore
}
async function getArtistAlbumInfo(artist: string, album: string) {
  const getAlbumInfo = `${lastFmBaseUrl}?method=album.getinfo&format=json&${lastFmApi}&artist=${artist}&album=${album}`
  const [err, res] = await to(axios.get<GetAlbumInfoRes>(getAlbumInfo))
  if (!res) throw new Error('Failed to fetch from API.')
  const albumInfo = res.data.album
  return albumInfo
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const [, artists] = await to(getTopArtistsByPageLastFM(4))
  // if (!artists) return res.status(500).send('Error fetching')
  // const [, writeResult] = await to(createArtistsBatch(artists))
  // if (!writeResult) return res.status(500).send('Error Creating users in DB.')
  // return res.status(200).send(writeResult)
  return res.send('hello world')
}
