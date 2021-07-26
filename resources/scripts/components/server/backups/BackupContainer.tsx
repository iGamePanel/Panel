import React, { useContext, useEffect, useState } from 'react';
import Spinner from '@/components/elements/Spinner';
import useFlash from '@/plugins/useFlash';
import Can from '@/components/elements/Can';
import CreateBackupButton from '@/components/server/backups/CreateBackupButton';
import FlashMessageRender from '@/components/FlashMessageRender';
import BackupRow from '@/components/server/backups/BackupRow';
import tw from 'twin.macro';
import getServerBackups, { Context as ServerBackupContext } from '@/api/swr/getServerBackups';
import { ServerContext } from '@/state/server';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import Pagination from '@/components/elements/Pagination';
import ContentBox from '@/components/elements/ContentBox';

const BackupContainer = () => {
    const { page, setPage } = useContext(ServerBackupContext);
    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const { data: backups, error, isValidating } = getServerBackups();

    const backupLimit = ServerContext.useStoreState(state => state.server.data!.featureLimits.backups);

    useEffect(() => {
        if (!error) {
            clearFlashes('backups');

            return;
        }

        clearAndAddHttpError({ error, key: 'backups' });
    }, [ error ]);

    if (!backups || (error && isValidating)) {
        return <Spinner size={'large'} centered/>;
    }

    return (
        <ServerContentBlock title={'Backups'}>
            <FlashMessageRender byKey={'backups'} css={tw`mb-4`}/>
            <ContentBox>
            <Pagination data={backups} onPageSelect={setPage} css={tw`mt-6`}>
                {({ items }) => (
                    !items.length ?
                        // Don't show any error messages if the server has no backups and the user cannot
                        // create additional ones for the server.
                        !backupLimit ?
                            null
                            :
                            <p css={tw`text-center text-sm text-neutral-300`}>
                                {page > 1 ?
                                    'On dirait que nous n\'avons plus de sauvegardes à vous montrer, essayez de revenir de revenir en arrière.'
                                    :
                                    'Il n\'y a pas de backup sur votre serveurs'
                                }
                            </p>
                        :
                        items.map((backup, index) => <BackupRow
                            key={backup.uuid}
                            backup={backup}
                            css={index > 0 ? tw`mt-2` : undefined}
                        />)
                )}
            </Pagination>
            {backupLimit === 0 &&
            <p css={tw`text-center text-sm text-neutral-300 mt-6`}>
                Backups cannot be created for this server because the backup limit is set to 0.
            </p>
            }
            <Can action={'backup.create'}>
                <div css={tw`mt-6 sm:flex items-center justify-end`}>
                    {(backupLimit > 0 && backups.pagination.total > 0) &&
                    <p css={tw`text-sm text-neutral-300 mb-4 sm:mr-6 sm:mb-0`}>
                        {backups.pagination.total} of {backupLimit} backups have been created for this server.
                    </p>
                    }
                    {backupLimit > 0 && backupLimit !== backups.pagination.total &&
                    <CreateBackupButton css={tw`w-full sm:w-auto`}/>
                    }
                </div>
            </Can>
          </ContentBox>
        </ServerContentBlock>
    );
};

export default () => {
    const [ page, setPage ] = useState<number>(1);
    return (
        <ServerBackupContext.Provider value={{ page, setPage }}>
            <BackupContainer/>
        </ServerBackupContext.Provider>
    );
};
