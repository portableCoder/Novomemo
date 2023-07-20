"use client"
import { Session } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import useStore from '@store/index'
import createClient from './createClient'

const useAuth = () => {

    const [session, setSession, setLoading, setSupabase] = useStore((s) => [s.session, s.setSession, s.setGlobalLoading, s.setSupabase])
    useEffect(() => {

        const supabase = createClient()
        setSupabase(supabase)
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            console.log(_event)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])
    return session


}

export default useAuth